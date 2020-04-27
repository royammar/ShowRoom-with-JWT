let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);


const INITIAL_STATE = {

  loggedInUser: 
  localLoggedinUser
  //  {
  //     "_id" : "5e2364c31a0d5feaa843e505",
  //     "userName" : "roy",
  //     "fullName" : "Guest",
  //     "email" : "roy@gmail.com",
  //     "imgUrl":"https://scontent.ftlv1-2.fna.fbcdn.net/v/t1.0-9/10559713_10153073749172830_4028919375654008823_n.jpg?_nc_cat=110&_nc_ohc=ZSXUpO9enJcAX8_90u2&_nc_ht=scontent.ftlv1-2.fna&oh=88224c80c2a320270ff66a197828934b&oe=5E8DD8EF",
  //     "password" : "123",
  //     "wishlist" : [],
  //     "shopId" : ""
  // }

}

export default function UserReducer(state = INITIAL_STATE, action = {}) {

  switch (action.type) {
    case 'SET_USER':
      return { ...state, loggedInUser: action.user };
    case 'UPDATE_USER':
      return { ...state, loggedInUser: action.user }
    default:
      return state;
  }
}