# Vue.js Workshop
A simple guide to get started with Vue.js

In this guide we'll build a simple list application in which we will add, select and delete items:

![](./images/final_example.png)


## Setup
> This project require an up-to-date node and npm installed

1. Copy the _initial_project_ folder contents
2. `npm install` (or `yarn`)
3. `npm start` (or `yarn start`)
  * This command will fail until we build out first component!
4. App will be available in `http://localhost:1234`

> A working example of the project is available in `final_project`, follow the same steps in that folder to try it

## Basics

Our basic setup uses [Parcel](https://parceljs.org/cli.html) for transpiling and bundling our source code into the _public_ folder. It will also provide a hot-reload server.

In the _src_ folder we have the basic code that we need to get started in our app development. A brief explanation of these files:
* **index.html** is our app entry point, and the base file that we will send to our users. It contains links to our stylesheet (https://andybrewer.github.io/mvp) and our Vue application (_app.js_).
* **app.js** contains our application setup and mounts our app in the `#app` element.
* components/**app.vue** is our main component (root) to be mounted inside the `#app` element.


### Building our first component
Vue components can be build in plain js, separate into multiple files, or, usually, in [**.vue** files](https://vuejs.org/v2/guide/single-file-components.html).

> A .vue file contains a single component.

Components have 3 parts:

#### Template
The template contains the code that will, eventually, be rendered as **html**.

Usually, plain **html** along with extended template syntax is used.

> When using _.vue_ files, the template will be inserted into `<template></template>` tags

#### Script
This contain the logic of our component. Ideally, all our component's logic will be inside its script, and this script should not affect other components.

The script can be written with plain **JavaScript** or **TypeScript** among other options.

Our code will, ultimately, export a single object containing all out component's state and logic.

> When using _.vue_ files, the script will be inserted into `<script></script>` tags.

#### Styles
Styles contain the **css** (or [**scss**](https://sass-lang.com/documentation/syntax)) that will be used to in the template.

These styles, by default, are applied to all the application (just like CSS works), but by defining the style as [**scoped**](https://vue-loader.vuejs.org/guide/scoped-css.html) it will only affect its component.

Usually, all styles should be scoped, global styles should be imported through global stylesheets to avoid unwanted dependencies between components.

> When using _.vue_ files, the styles will be inserted into `<style></style>` tags. It is recommended to use **scoped** styles:`<style scoped>`.

## Our first component

In our **app.vue** file, we will write the simplest component by adding some raw html to our template:

```html
<template>
  <p>Don't Panic</p>
</template>
```

As you can see, a component does not need a explicit **script** nor **styles**.

If we run our project now (`npm start`) we will get our lovely message.

However, a component with only plain HTML is not a lot of fun. Before attempting to build our app, lets make this component a bit more interesting.

### State
A component has an internal state that contains the dynamic data.

We will create a `<script>` section with out component and a `data` method that contains our state:

```html
<template>
...
</template>

<script>
module.exports = { // ES6 export syntax available
  data(){
    return {
      text: "hello world"
    }
  }
}
</script>
```

The **data** method returns an object, this object is the internal state of the component, and it is available both in the template and the rest of the component object by using **this** (e.g. `this.text`).

However, running this won't make a difference, the template is still a static HTML!.

We can easily change this by using the handy template interpolation:

```html
<template>
  <p>My component says: {{text}}</p>
</template>
```

A now we get:   
![](./images/first_component_1.png)

Vue will take care of updating the HTML whenever the internal state of the component changes.

> Unlike plain string concatenation, template interpolation will also take care of escaping the input to avoid HTML injection.

### Interactions
> Vue component goes brrr

We have a fancy dynamic field and a component that will react to it, but it is not very useful if we cannot change it.

We will begin by modifying the template a bit and adding a button:

```html
<template>
<div>
    <p>Counter: {{count}}</p>
    <button>Add 1</button>
</div>
</template>


<script>
module.exports = {
    data() {
        return {
            count: 0
        }
    }
}
</script>
```

> Notice the div we added. In Vue 2.x a component can only contain a single root element, so for complex components a div is usually placed on top.

![](./images/counter_1.png)

Lovely! However, clicking the button doesn't do anything yet. To react to a button click, we need to listen to that button **click event**, and call a **method** when that event is triggered:

```html
<template>
    ...
    <button @click="addOne">Add 1</button>
    ...
</template>

<script>
module.exports = {
    ...
    methods: {
        addOne() {
            this.count++;
        }
    }
}
</script>
```

In our template, we listen to an event by using `@[event]`, in this case `@click` and assigning a method of the component.

Methods are defined inside the **methods** property, these methods are available in the template and through the component by using **this**.

Running the app now should work as expected. The component is listening to all button click events, and for each button the variable _count_ is increased by one and the template is rendered accordingly.


## Lets build an app
Now we can start building our list app!!

### Text input
First, we need to add a text input and "read" its value somehow, lets rewrite out template and script once more:

```html
<template>
<div>
    <input type="text" v-model="userInput"/>
    <p>{{userInput}}</p>
</div>
</template>


<script>
module.exports = {
    data() {
        return {
            userInput: ""
        }
    }
}
</script>
```

In this first version, we have a variable **userInput** that will contain the up-to-date text that the user has entered in the input. In out **input** component, the property **v-model** will take care of binding our variable to the input internal value, updating one when the other changes and vice-versa.

The variable is then rendered in the `<p>` element for debugging purposes.

> Pro tip: Using the browser extenson vue-devtools this kind debugging can be done without changing the code!

![](./images/input_1.png)

The text will update whenever the input changes. We can remove the `<p>` element now we confirmed our binding works.

## Building a list
Next, we need our items list. We will add a new variable to our data:
```js
data() {
    return {
        userInput: "",
        items: ["Test1", "Test2"]
    }
}
```

In this case we created an array, and added a couple of elements so we can see something when we render it.

We will render our list using HTML `<ul>` and `<li>`, however, because we don't know how many elements we will need, we will make our `<li>` dynamic, one per element:
```html
<template>
...
<ul>
  <li v-for="(item, i) in items" :key="i">{{item}}</li>
</ul>
</template>
```
With the property **v-for** we can render an element as many times as elements are in an array. The variables **item** and **i** contain the current item and its index respectively. These 2 variables can be used on the rendered element.

In this case, we are simply displaying the item with interpolation inside the `<li>` tag.

> The **:key** property is a requirement for loops, this ensures that items inside the loop are properly (and efficiently) rendered when the array is modified. For simple cases like this using the item index as key is enough.


## Adding items to the list
Our list is a bit static, we want to update it with out text input.

We can achieve this multiple ways, like adding a button and listening to the click event. However, to be able to also support the usual input methods (like pressing enter) we can use native forms:

```html
<template>
  ...
  <form @submit.prevent="onNewItem">
      <input type="text" v-model="userInput"/>
      <button type="submit">Add Item</button>
  </form>
  ...
</template>
```

In this example, we are using a native HTML form along with a button of type **submit**. This ensures that most usual inputs for the form are handled and captured by our **@submit** in the form (note that no event is captured in the button now).

The **.prevent** modifier prevents browser to perform the default request made when forms are submitted. Just like our click example, a method is assigned to be triggered by our event.

Now, lets implement our method:
```js
...
methods: {
    onNewItem() {
        this.items.push(this.userInput)
        this.userInput = "";
    }
}
...
```
When the user submits its input, we will simply add to the items array. The **v-for** will render the new element accordingly.

After this, we will set our userInput to an empty string. Because our **v-model** binds the `<input>` element and our variable on both ways, we will, effectively, clear the input box.

![](./images/list_1.png)

We can now remove our test items and set the initial value of items to an empty array.

## Detailed view
We want to interact with our list items as well. Clicking on them should open a detailed view of the item, with options such as **delete**.

![](./images/detailed_1.png)

First, we will need a variable in data to hold our selected item:

```js
data() {
    return {
        userInput: "",
        items: [],
        selectedItemIndex: null,
    }
}
```

Now, by adding a `@click` event to our items and passing the **index** (i) from the `v-for` directive, we can update this variable:

```html
<template>
...
<li v-for="(item, i) in items" :key="i" @click="itemClicked(i)">{{item}}</li>
...
</template>

<script>
...
methods: {
  ...
  itemClicked(i) {
      this.selectedItemIndex = i;
  }
}
...
</script>
```

> Using <a> for the clickable items or styles would be a good idea to provide feedback.

Now, we have everything we need for our detailed view. Let's begin by creating our template:

```html
<template>
  ...
  <div>
      <h1>Details for {{items[selectedItemIndex]}}</h1>
      <p>Index: {{selectedItemIndex}}</p>
      <button @click="onDelete">Delete {{items[selectedItemIndex]}}</button>
  </div>
</template>
```

And our **onDelete** method:
```js
onDelete() {
    this.items.splice(this.selectedItemIndex, 1);
    this.selectedItemIndex = null;
}
```

![](./images/detailed_2.png)

### Conditional rendering
Our Detailed View is always visible, even if no item is selected. To avoid rendering it until an item is selected, we will use the `v-if` directive.

`v-if` allows us to render an element in our template only if a condition is met, in this case, we only want our detailed view to be rendered if an item is selected:

```html
<template>
  ...
  <div v-if="selectedItemIndex!==null">
      <h1>Details for {{items[selectedItemIndex]}}</h1>
      ....
  </div>
</template>

```

### Computed properties
Adding complex logic in our templates that depend on reactive variables will soon lead to hard to maintain code, in the example above our `v-if` logic is still pretty simple, but it is easy to imagine how complex the condition may grow.

Instead of trying to use a method or an extra property, to decouple the logic from the template without compromising performance, we will use Vue [computed properties](https://vuejs.org/v2/guide/computed.html).

A computed property behaves similar to **getters** in classes, as they are methods that can be used as properties. However, they have 2 key particularities:
* A computed property will be reactive, just like normal properties.
* A computed property uses some sort of memoization (unlike methods or [watchers](https://vuejs.org/v2/guide/computed.html#Watchers)) so it is only executed when referenced properties change. This means that even costly operations can be efficiently delegated to a computed property.

In our example, lets move our `selectedItemIndex!==null` to a computed property:

```html
<template>
  ...
  <div v-if="showDetail">
      ....
  </div>
</template>

<script>
module.exports = {
    data() {
      // ...
    },
    methods: {
      // ...
    },
    computed:{
      showDetail(){
        return this.selectedItemIndex!==null
      },
    }
}

</script>
```

In this example, `showDetail` acts as a read-only property that can be accessed in the template or methods of the component.

It is implemented the same way as methods, but under the **computed** section, the computed property has access to the component state and its methods, the memoization happens automatically on the reactive properties used, in this example the `showDetail` will always be in sync with the `selectedItemIndex`.

### Add some style

We have a detailed view, but it requires some extra **css styles** to look nice!

To add styles to our component, we will add a class and create a new section:


```html
<template>
  ...
  <div v-if="showDetail" class="detailed-view">
    ...
  <div>
</template>

<script>
// ...
</script>


<style lang="scss" scoped>
.detailed-view {
    background-color: #e2e2e2;

    button {
        background-color: #c90000;
    }
}
</style>
```

The `<style>` directive, by default, will contain `css` styles that will be injected into the final page. The 2 directives added are optional:
* **lang**: This define the language to use, in this case we will be using [scss](https://sass-lang.com/documentation/syntax) instead of plain css.
* **scoped**: This marks the css to **only** affect the current component. It is recommended to **always** add this directive, and leave any global css to a common css file.

The content of the `<style>` is just plain **scss**, which works similar to css. Plain **css** can also be used.


## Separating in components


# Vuex
