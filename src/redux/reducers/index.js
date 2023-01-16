import { combineReducers } from "redux";

import courses from "./courses"
import modules from "./modules"
import quiz from "./quiz"
import subscription from "./subscriptions"
import wishlist from "./wishList"

export default combineReducers({
    courses,modules,quiz,subscription,wishlist,
})