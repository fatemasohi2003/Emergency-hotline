1. Difference between getElementById, getElementsByClassName, and querySelector/querySelectorAll

getElementById – It finds an element by its ID. It returns only one element because IDs are unique.

getElementsByClassName – It finds elements by class name. It returns a list of elements.

querySelector – It finds the first element that matches a CSS selector (like .class, #id, div p etc.).

querySelectorAll – It finds all elements matching a CSS selector and returns a list.




2.How to create and insert a new element into the DOM

const newDiv = document.createElement("div"); 
newDiv.textContent = "Hello";         
document.body.appendChild(newDiv);

3.What is Event Bubbling and how does it work?

Event bubbling means when an event occurs on a child element, it first runs on that element,
then moves up to its parent, then to the grandparent, and so on up to the root (document).


4. What is Event Delegation?

Instead of adding click events to many child elements, we add one event to their parent, and handle all clicks from there.

This saves time and improves performance.

5. Difference between preventDefault() and stopPropagation()

preventDefault() stops the browser's default behavior.
Example: stops a form from submitting or a link from opening.

stopPropagation() stops the event from going to parent elements during bubbling.


