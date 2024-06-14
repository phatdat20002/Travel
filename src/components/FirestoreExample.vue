<template>
  <div class="body">
    <div class="container">
      <ul class="comment">
        <li v-for="comment in commentsSorted" :key="comment.id" class="comment_li">
          <div>
            <h4>{{ comment.username }}</h4> 
          </div>
          <div class="comment_all">
            <div>
              <p class="comment_content">{{ comment.content }}</p>
              <p class="comment_date">{{ formatDate(comment.date) }}<i class="fa-solid fa-earth-americas"></i></p>
            </div>
            <div @click="toggleComment(comment.id)" class="comment_edit_delete">
              <svg viewBox="0 0 20 20" width="20" height="20" fill="currentColor" class="line_hieght x19dipnz x1lliihq x1tzjh5l x1k90msu x2h7rmj x1qfuztq" style="--color: var(--secondary-icon);">
                <g fill-rule="evenodd" transform="translate(-446 -350)">
                  <path d="M458 360a2 2 0 1 1-4 0 2 2 0 0 1 4 0m6 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0m-12 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0"></path>
                </g>
              </svg>
              <div v-show="editStates[comment.id]" class="container_edit_delete">
                <button @click="updateComment(comment)" class="edit">Chỉnh sửa <span><i class="fa-regular fa-pen-to-square"></i></span></button>
                <button @click="deleteComment(comment.id)" class="delete">Xóa<i class="fa-solid fa-trash"></i></button>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <h3 class="container_heading">Nêu cảm nghĩ của bạn sau khi tham quan những địa điểm trên trên</h3>
      <h3 class="container_heading underline">Nhập tên người chia sẻ:</h3>
      <form @submit.prevent="addComment">
        <v-text-field v-model="userName" placeholder="Bạn có thể chia sẻ với tư cách ẩn danh nếu không nhập vào trường này..." class="input-name"></v-text-field>
        <textarea v-model="newComment.content" rows="6" cols="50" required placeholder="Nhập bình luận" class="textarea" @keydown.enter="addComment"></textarea>
        <button class="button-34" role="button">Thêm bình luận</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import db from '@/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import moment from 'moment';

const comments = ref([]);
const newComment = ref({ content: '' });
const editStates = ref({});

const toggleComment = (commentId) => {
  editStates.value = {
    ...editStates.value,
    [commentId]: !editStates.value[commentId]
  };
};

onMounted(async () => {
  await getComments();
});

const userName = ref('');

const getComments = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'comments'));
    comments.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    comments.value.sort((a, b) => new Date(b.date.seconds * 1000 + b.date.nanoseconds / 1000000) - new Date(a.date.seconds * 1000 + a.date.nanoseconds / 1000000));
    comments.value.forEach(comment => {
      editStates.value[comment.id] = false;
    });
  } catch (error) {
    console.error('Error getting documents: ', error);
  }
};

const addComment = async () => {
  try {
    const username = userName.value || 'Ẩn Danh';
    const commentData = {
      content: newComment.value.content,
      username,
      date: Timestamp.now()
    };
    await addDoc(collection(db, 'comments'), commentData);
    newComment.value = { content: '' };
    await getComments();
  } catch (error) {
    console.error('Error adding document: ', error);
  }
};

const updateComment = async (comment) => {
  const updatedContent = prompt('Enter new content:', comment.content);
  if (updatedContent) {
    try {
      await updateDoc(doc(db, 'comments', comment.id), { content: updatedContent });
      await getComments();
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  }
};

const deleteComment = async (id) => {
  try {
    await deleteDoc(doc(db, 'comments', id));
    await getComments();
  } catch (error) {
    console.error('Error removing document: ', error);
  }
};

const formatDate = (timestamp) => {
  if (timestamp && timestamp.seconds) {
    const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
    return moment(date).format('DD-MM-YYYY HH:mm:ss');
  }
  return 'Invalid Date';
};

const commentsSorted = computed(() => comments.value.slice().sort((a, b) => new Date(b.date.seconds * 1000 + b.date.nanoseconds / 1000000) - new Date(a.date.seconds * 1000 + a.date.nanoseconds / 1000000)));

</script>

<style scoped>
.body {
  background-color: #ffffff;
}
.underline {
  display: inline-block;
  width: 100%;
  border-bottom: 1px solid #ccc;
  padding: 12px 0;
  margin-bottom: 10px;
}
.container {
  max-width: 1085px;
  width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20px 3rem;
  color: #000000;
}
.container_heading {
  padding-top: 12px;
}
.comment {
  list-style-type: none;
}
.comment_date {
  font-size: 10px;
  color: #65676B;
}
.comment_date i {
  margin-left: 6px;
}
.comment_all {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f0f2f5;
  padding: 12px;
  border-radius: 12px;
  margin: 12px 0;
}
.comment_li {
  position: relative;
}
.comment_content {
  max-width: 942px;
}
.line_hieght {
  position: relative;
  top: 5px;
}
.container_edit_delete {
  background-color: #ffffff;
  position: absolute;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-radius: 12px;
  width: 342px;
  right: 0;
  margin-top: 12px;
  z-index: 99999;
  padding: 8px 12px;
}
.textarea {
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 10px;
  color: #000000;
  padding: 12px;
  border: 1px solid #ccc;
  margin-top: 14px;
}
.line_hieght {
  height: 100%;
}
.edit, .delete {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  text-align: left;
  padding: 8px 12px;
}
.edit:hover, .delete:hover {
  background-color: #d1cece82;
}
.edit span {
  text-align: right;
}
.button-34 {
  background: #5E5DF0;
  border-radius: 999px;
  box-shadow: #5E5DF0 0 10px 20px -10px;
  box-sizing: border-box;
  color: #FFFFFF;
  cursor: pointer;
  font-family: Inter, Helvetica, "Apple Color Emoji", "Segoe UI Emoji", NotoColorEmoji, "Noto Color Emoji", "Segoe UI Symbol", "Android Emoji", EmojiSymbols, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  min-height: 40px;
  outline: 0;
  padding: 8px 20px;
  text-align: center;
  touch-action: manipulation;
  transition: box-shadow .2s, -ms-transform .1s, -webkit-transform .1s, transform .1s;
  user-select: none;
  -webkit-user-select: none;
  vertical-align: middle;
}
.button-34:focus-visible {
  box-shadow: #5E5DF0 0 0 0 3px;
}
.button-34:hover {
  box-shadow: #5E5DF0 0 4px 8px -4px;
}
.button-34:active {
  background: #3E3ED0;
  box-shadow: #5E5DF0 0 2px 4px -2px;
  transform: translateY(2px);
}
</style>
