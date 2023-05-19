const express = require('express')
const GraphQL = require('express-graphql').graphqlHTTP
const { 
        GraphQLSchema,
        GraphQLObjectType,
        GraphQLString,
        GraphQLInt,
        GraphQLNonNull,
        GraphQLList
} = require('graphql')

const app = express()
// Example: Employees Data
const data = [
    {id: 1, emp_name: 'Ramesh',emp_designation:'Executive'},
    {id: 2, emp_name: 'Vijay',emp_designation:'Manager'},
    {id: 3, emp_name: 'Ganesh',emp_designation:'Support Executive'},
    {id: 4, emp_name: 'Dinesh',emp_designation:'Senior Manager'},

]

// Creating a GraphQL Schema for employees
const EmployeeType = new GraphQLObjectType({
    name:"employees",
    description:"A GraphQL employees schema",
    fields: ()=>(
        {
            id:{ 
                type: new GraphQLNonNull(GraphQLInt)
            },
            emp_name:{
                type: new GraphQLNonNull(GraphQLString)
            },
            emp_designation:{
                type: new GraphQLNonNull(GraphQLString)
            }
        }
    )
})

// Example GraphQL Query for Employees Data
const EmployeeQuery = new GraphQLObjectType({
    name:"Query",
    description:"Employee Query",
    fields:()=>({
        employee:{
            type: EmployeeType,
            description:"Fetch me a single employee",
            args:{
                id:{ type: GraphQLInt }
            },
            resolve: (parent, args)=> data.find(item => item.id === args.id ) 
        },
        employees:{
            type: new GraphQLList(EmployeeType),
            description:"Fetch me all employees",
            resolve: ()=> data
        }
    })
})

// create a schema object using GraphQLSchema 
const schema = new GraphQLSchema({
    query:EmployeeQuery
})


// start the server with GraphQL 
app.use('/',GraphQL({
    schema:schema,
    graphiql:true
}))

const PORT = 8080
app.listen(PORT,()=> console.log('GraphQL Server is Running!'))