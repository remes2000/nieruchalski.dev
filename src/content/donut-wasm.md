---
title: "donut.wasm - running C code in your browser"
slug: donut-wasm
subtitle: Running C code in your browser
thumbnail: /post-assets/donut-wasm/thumbnail.jpg
date: 2024-03-29 22:45:00.000Z
author: Michał Nieruchalski
# todo: update meta
meta:
  - name: description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:title
    content: "Deciphering Facebook: Analyzing Messenger Chats"
  - property: og:description
    content: "A short story about parsing and analyzing Facebook Messenger Chats"
  - property: og:image
    content: https://nieruchalski.dev/post-assets/deciphering-facebook/header.jpg
  - property: og:url
    content: https://nieruchalski.dev/deciphering-facebook
---

<figure>
  <iframe
    allow="clipboard-write"
    width="100%"
    height="500px"
    src="https://donut.nieruchalski.dev"></iframe>
    <figcaption>
      See full version 
      <a href="https://donut.nieruchalski.dev" target="_blank">here</a>
    </figcaption>
</figure>


# Background
I was super excited to give Webassembly a shot since it came out in 2017. After 7 years, I've finally decided to try it out and start a cool project around it.

<a href="https://www.a1k0n.net/2006/09/15/obfuscated-c-donut.html">Donut.c</a> is a fairly popular program written in C. It renders 3D donut shape using only ASCII characters. Each character corresponds with given illumination value, so `.` is the darkest and `@` is the brightest.

My objective was to create my own implementation of donut.c, parametrize it, run it inside the browser, and make it interactive. As illustrated by the live demo, you can manipulate donut properties using the toolbox, and  rotate it using mouse movements. There's also a feature to move the donut using 
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Pointer_Lock_API">Pointer Lock API</a>, as well as the ability to copy the current shape to a clipboard :)

# Scope
I won't discuss the math behind this project in this article. If you're interested in it, 
<a href="https://www.a1k0n.net/2011/07/20/donut-math.html">read this article</a>.
Instead I'll be focusing on running C code in the browser with Webassembly.

# Donut.c
A single donut.c file is the core of the whole project. Here, I've defined a couple of methods that I later call from javascript.
```c
char* render_frame(
  float* rotation_accumulator, 
  float screen_width, 
  float screen_height, 
  float r1,
  float r2,
  float distance
)
```

To render the donut, I have to call `render_frame` method. It requires a couple of parameters and returns ~~a string~~ a pointer to the memory address where the rendered donut shape is being stored. The user can set the parameter values via the toolbox. 

```c
void* wasmallocate(int number_of_bytes) {
  return malloc(number_of_bytes);
}
```

```c
void wasmfree(void *ptr) {
  free(ptr);
}
```

I've also exposed two additional methods. `wasmfree` and `wasmallocate`. Those two methods are simply `free` and `malloc` but accessible from the javascript.

In fact, I've exposed one more method, called rotate. It's tightly connected to math, and I won't discuss it.

But, how can I "expose" the method? There are two things that you need to do to achieve it.
First: include emscripten library
```c
#include <emscripten.h>
```
Second: annotate the method with `EMSCRIPTEN_KEEPALIVE`
```c
EMSCRIPTEN_KEEPALIVE
char* render_frame(...) {
...
}
```

# Compilation
Now, we want to compile C code into WASM and to accomplish that, we need a proper compilator. I've used 
<a href="https://emscripten.org/">Emscripten</a>.
```bash
emcc donut.c -o donut.js
```
As a result of the above command, the donut.wasm file was created.

# Calling C methods
I have my donut.wasm file, but how do I use it? Well, 
I've created a single script.mjs file that's an entry point for my website's javascript :)
First, you need to define an object that will represent the memory.

```javascript
let memory = new WebAssembly.Memory({
  initial: 256,
  maximum: 512
});
```
The created object is of type 
<a href="https://developer.mozilla.org/en-US/docs/WebAssembly/JavaScript_interface/Memory">Webassembly.Memory</a>
that is, in fact, an 
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer">ArrayBuffer</a>
that holds the raw bytes of memory. The state of the buffer is shared between javascript and C code, and this is where the information exchange will take place. Both javascript and C code can read/write to/from memory.

Once we have memory object ready, we can actually run donut.wasm code. Here's how to do it.
```javascript
WebAssembly.instantiateStreaming(fetch('src/wasm/donut.wasm'), {
  js: { mem: memory },
  env: { 
    emscripten_resize_heap: memory.grow,
  },
}).then((results) => {
  console.log(results);
});
```
* I've used 
<a href="https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API">Fetch API</a>, to fetch the content of donut.wasm file
* `'src/wasm/donut.wasm'` is a location of my .wasm file
* `js: { mem: memory },` is where I instruct the javascript to use my `memory` object
* `emscripten_resize_heap: memory.grow,` here I provide the method to grow the current memory size. I only have to do it because I've used `malloc` in my code.
* Finally, I log the result of the resolved promise

<figure>
  <img
    src="/post-assets/donut-wasm/consolelog.png"
    alt="Object logged on console"
    title="Object logged on console"
  />
  <figcaption>Object logged on console</figcaption>
</figure>

As we can see our exposed methods are ready to be used under `results.instance.exports`. Nice!

# Passing a number

# Passing an array of numbers

# Reading char*

# Todo
* Poprawić RWD donuta
* Zdecydować się czy ten artykuł to poardnik czy dziennik (jakiego czasu powinienem użyć)