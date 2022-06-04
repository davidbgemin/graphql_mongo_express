const Task = require("./models/Task");

const resolvers = {
    Query: {
        hello: () => "Hello world",
        getAllTasks: async () => {
            const tasks = await Task.find();
            return tasks;
        },
        getTask: async (_, args) => {
            const task = await Task.findById(args.id);
            return task;
        },
    },
    Mutation: {
        // createTasks: (parent, args, context, info) => {
        //     console.log({parent, args, context, info})
        // }
        createTasks: async (_, args) => {
            const { title, description } = args.task;
            const newTask = new Task({ title, description });
            await newTask.save();
            return newTask;
        },
        deleteTask: async (_, { id }) => {
            await Task.findByIdAndDelete(id);
            return "Task delete";
        },
        async updateTask(_, { task, id }) {
            const taskUpdated = await Task.findByIdAndUpdate(id, {
                // $set: actualizar solo lo que traiga la consulta: si trae solo el título actualizar solo el título. Si trae solo la descripción, solo actualiza la descripcion
                $set: task
            }, { new: true });

            return taskUpdated;
        },
    },
};

module.exports = { resolvers };
