import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: []
};

const loadState = () => {
  const getStateData = sessionStorage.getItem("userList");
  if (getStateData === null) {
    return initialState;
  }
  return JSON.parse(getStateData);
};

const saveState = (state) => {
  const updateStateData = JSON.stringify(state);
  sessionStorage.setItem("userList", updateStateData);
};

const userSlice = createSlice({
  name: 'users',
  initialState: loadState(),
  reducers: {
    addUser: (state, action) => {
      const { id, name, email, phone, image, hobbies, description } = action.payload;
      const newUser = { id, name, email, phone, image, hobbies, description };
      const updatedUserList = [...state.userList, newUser];
      saveState({ userList: updatedUserList });
      return {
        ...state,
        userList: updatedUserList
      };
    },
    updateUser: (state, action) => {
      const { id, name, email, phone, image, hobbies, description } = action.payload;
      const updatedUserList = state.userList.map(user => {
        if (user.id.toString() === id) {
          return { ...user, name, email, phone, image, hobbies, description };
        }
        return user;
      });
      saveState({ userList: updatedUserList });
      return {
        ...state,
        userList: updatedUserList
      };
    },
    deleteUser: (state, action) => {
      const { id } = action.payload;
      const updatedUserList = state.userList.filter(user => user.id !== id);
      saveState({ userList: updatedUserList });
      return {
        ...state,
        userList: updatedUserList
      };
    }
  }
});

export const { addUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
