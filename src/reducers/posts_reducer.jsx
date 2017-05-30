import { FETCH_POSTS, FETCH_POST } from '../actions';

export default (state = [], action) => {
	if (action.type === FETCH_POSTS) {
		return action.payload;
	}else if (action.type === FETCH_POST) {
		return action.payload;
	}
    return state;
}


// export default (state = {}, action) => { 
//   switch(action.type) {
//     case `${FETCH_POSTS}_PENDING`:
//     	alert('fulfilled');
//       return {};

//     case `${FETCH_POSTS}_FULFILLED`:
//     	alert('fulfilled');
//       return {
//         isFulfilled: true,
//         data: action.payload
//       };

//     case `${FETCH_POSTS}_REJECTED`:
//     alert('fulfilled');
//       return {
//         isRejected: true,
//         error: action.payload
//       };
//       alert('fulfilled');
//     default: return state;
//   }
// }

// import { FETCH_POSTS } from '../actions';

// export default (state = [], action) => {
//     switch (action.type) {
//         case FETCH_POSTS:
//         case FETCH_POST:
//             return action.payload;
//   		break;
//     	default: return state;
//     };
// }
