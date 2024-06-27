import express, { request, response } from "express";

const app = express();
app.use(express.json())



const mockUsers = [
        { id: "1", age: 20,  userName:"joseph", displayName:"Joseph" },
        { id: "2", age: 200, userName:"paul", displayName:"Paul" },
        { id: "3", age: 209, userName:"john", displayName:"John" },
        { id: "4", age: 204, userName:"peter", displayName:"Peter" },
        { id: "4", age: 204, userName:"peter", displayName:"Peter" },
        { id: "5", age: 203, userName:"simon", displayName:"Simon" },
        { id: "6", age: 220, userName:"joy", displayName:"Joy" },
        { id: "7", age: 210, userName:"prince", displayName:"Prince" }
]


app.get('/', (request, response) => {
    response.status(200).send({msg: "hello world of express"})
})

app.get('/api/users', (request, response) => {
    console.log(request.query)

    const { query: { filter, value } } = request
    if (!filter && !value) return response.send(mockUsers)
    if (filter && value) return response.send(mockUsers.filter((user) => user[filter].includes(value)))
    
    return response.send(mockUsers)

})


app.get("/api/users/:id", (request, response) => {
    console.log(request.params)
    
    const parsedId = parseInt(request.params.id);
    if (isNaN(parsedId)) return response.status(400).send({ msg: "Bad request. Invalide ID"})   
        
        const findUser = mockUsers.find((user) => user.id === parsedId);
        if (!findUser) return response.sendStatus(404)
            
            return response.send(findUser)
        })
        
        app.post("/api/users", (request, response) => {
            console.log(request.body);
        
            const { body } = request;
            const newUser = { id: mockUsers[mockUsers.length - 1].id + 1, ...body }
            mockUsers.push(newUser)
            return response.status(201).send(newUser)
        })

            app.put("/api/users", (request, response) => {
            console.log(request.body);
        
                const { body, params: { id } } = request;
                
                const parsedId = parent(id);
                if (isNaN(parsedId)) return response.sendStatus(400)
                
                const foundeUserIndex = mockUsers.findIndex((user) => user.id === parsedId);
                if (foundeUserIndex === -1) return response.sendStatus(400)
                mockUsers[foundeUserIndex] = {id:parsedId, ...body}

 
            return response.status(201).send(newUser)
        })







        
        const port = process.env.PORT || 3000
        
        app.listen(port, () => console.log(`Running on localHost: ${port}`));  