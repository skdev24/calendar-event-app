import create from 'zustand';
import produce from 'immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Turn the set method into an immer proxy
const immer = (config) => (set, get, api) =>
  config(
    (fn) => {
      const state = typeof fn === 'function' ? fn : () => fn;
      set(produce(state));
    },
    get,
    api
  );

const zustandCreateStore = (children) => create(immer(children));

const storeStates = {
  todo: []
};

const storeMethods = (set, get) => ({
  init: async () => {
    try {
      // await AsyncStorage.clear();
      const todo = await AsyncStorage.getItem('TODO');
      if (todo !== null) {
        set({ todo: JSON.parse(todo) });
      }
    } catch (error) {
      // Error saving data
    }
  },
  updateTodo: async (item) =>
    new Promise(async (resolve) => {
      const datePresent = get().todo.find((data) => {
        if (data.date === item.date) {
          return true;
        }
        return false;
      });

      if (datePresent) {
        const updatedTodo = get().todo.map((data) => {
          if (datePresent.date === data.date) {
            return { ...data, todoList: [...data.todoList, ...item.todoList] };
          }
          return data;
        });

        try {
          set({ todo: updatedTodo });
          await AsyncStorage.setItem('TODO', JSON.stringify(updatedTodo));
        } catch (error) {
          // Error saving data
        }
      } else {
        const newTodo = [...get().todo, item];

        try {
          set({ todo: newTodo });
          resolve();
          await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
        } catch (error) {
          // Error saving data
        }
      }
    }),
  deleteTodo: () => {},
  updateSelectedTask: async (item) =>
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.map((list) => {
            if (list.key === item.todo.key) {
              return item.todo;
            }
            return list;
          });
          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      try {
        set({ todo: newTodo });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(newTodo));
      } catch (error) {
        // Error saving data
      }
    }),
  deleteSelectedTask: async (item) =>
    new Promise(async (resolve) => {
      const previousTodo = get().todo;
      const newTodo = previousTodo.map((data) => {
        if (item.date === data.date) {
          const previousTodoList = [...data.todoList];
          const newTodoList = previousTodoList.filter((list) => {
            if (list.key === item.todo.key) {
              return false;
            }
            return true;
          });

          return { ...data, todoList: newTodoList };
        }
        return data;
      });
      const checkForEmpty = newTodo.filter((data) => {
        if (data.todoList.length === 0) {
          return false;
        }
        return true;
      });
      try {
        set({ todo: checkForEmpty });
        resolve();
        await AsyncStorage.setItem('TODO', JSON.stringify(checkForEmpty));
      } catch (error) {
        // Error saving data
      }
    })
});

const useStore = zustandCreateStore((set, get) => ({
  ...storeStates,
  ...storeMethods(set, get)
}));

export default useStore;
