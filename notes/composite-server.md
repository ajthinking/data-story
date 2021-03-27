# Extendable servers
```jsx
let server = new DefaultServer()
// Add some extra nodes or configuration
server.extend(extension)
```
```html
<DataStory server={server}>
```

# Composite servers

```jsx
let server = new CompositeServer({
    DefaultServer, // generic nodes
    CustomServer, // custom nodes
})
```
```html
<DataStory server={server}>
```

Example:
* Frontend boots
    - The CompositeServer will in turn boot each underlying server - DefaultServer and CustomServer - and combine capabilities
* Frontend run:
    - executionOrder is calculated
    - for each node delegate computation to coresponding server