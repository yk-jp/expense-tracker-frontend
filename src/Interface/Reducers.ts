import tokens from "./Token"
import category, {categoryAll} from "./Category"

export interface DSRAction {
	type: string,
}

export interface USRAction {
	type: string,
	token?: tokens | null,
	email: string | null,
}

export interface USCategoryAction {
	type: string,
	newCategory: category[]
}

export interface displayState{
	isRegisterShown: boolean,
	isMiniCalendarShown: boolean
}

export interface userState {
	loggedIn: boolean,
	tokens: tokens | null,
	email: string | null,
	category: categoryAll
}
