<template>
    <div class="container">
        <main class="p-20">
            <div class="flex justify-center mb-2">
                <div class="w-2/3">
                    <p>v-if</p>
                    <p>ボタンをクリックしたら表示するテキストが切り替わる</p>

                    <div class="p-2">
                        <button
                            class="p-2 bg-blue-300 rounded-md hover:bg-blue-400 text-white"
                            @click="onClickButton"
                        >
                        ボタン
                        </button>
                        <div class="mt-2">
                            <p v-if="flag" class="bg-white">フラグがONです</p>
                            <p v-else class="bg-white">フラグがOFFです</p>
                        </div>                        
                    </div>
                </div>
            </div>

            <div class="flex justify-center mb-2">
                <div class="w-2/3">
                    <p>参考演算子を使った適用するcssの切り替え</p>
                    <p>ボタンをクリックしたら適用するcssが切り替わる</p>

                    <div class="p-2">
                        <div
                            class="p-5 flex justfy-center" 
                            :class="flag ? 'bg-red-200' : 'bg-blue-200'"
                        >
                            この部分の背景が切り替わる
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex justify-center mb-2">
                <div class="w-2/3">
                    <p>v-for</p>
                    <p>一覧をサーバーから取得して表示する</p>

                    <div class="p-2">
                        <button
                            class="p-2 bg-blue-300 rounded-md hover:bg-red-400 text-white"
                            @click="clearTodos"
                        >
                            クリア
                        </button>

                        <table v-if="state.todos.length" class="w-full mt-2">
                            <thead>
                                <tr class="text-left">
                                    <th class="border border-gray-300 bg-white">ID</th>
                                    <th class="border border-gray-300 bg-white">TITLE</th>
                                    <th class="border border-gray-300 bg-white">COMPLETED</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(todo,index) in state.todos" :key="index">
                                    <td class="border border-gray-300 bg-white">{{todo.id}}</td>
                                    <td class="border border-gray-300 bg-white">{{todo.title}}</td>
                                    <td class="border border-gray-300 bg-white text-center">
                                        <input v-model="todo.completed" type="checkbox" />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div v-else>表示するデータがありません</div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive} from "vue";
import axios from "axios";

class Todo{
    userId: number | null = null;
    id: number | null = null;
    title: string = "";
    completed: boolean = false;
}

interface State{
    todos: Todo[];
    flag: boolean;
}

//const flag = ref<boolean>(false);
const state = reactive<State>({
    todos: [],
    flag: false,
});
const onClickButton = () =>{
    state.flag = !state.flag;
};
const fetchData = () => {
    axios
        .get<Todo[]>("https://jsonplaceholder.typicode.com/todos")
        .then(({data}) => {
            state.todos.splice(0);
            data.forEach((obj) => {
                console.log(obj);

                const tempTodo = new Todo();
                Object.assign(tempTodo, obj);
                state.todos.push(tempTodo);
            });
        });
};

const clearTodos = () => {
    state.todos.splice(0);
};

</script>

<style></style>