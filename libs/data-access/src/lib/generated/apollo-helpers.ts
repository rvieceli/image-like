import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type ImageKeySpecifier = ('author' | 'description' | 'height' | 'id' | 'likedBy' | 'likesCount' | 'link' | 'url' | 'width' | ImageKeySpecifier)[];
export type ImageFieldPolicy = {
	author?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	height?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	likedBy?: FieldPolicy<any> | FieldReadFunction<any>,
	likesCount?: FieldPolicy<any> | FieldReadFunction<any>,
	link?: FieldPolicy<any> | FieldReadFunction<any>,
	url?: FieldPolicy<any> | FieldReadFunction<any>,
	width?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ImageSearchResultKeySpecifier = ('hasMore' | 'page' | 'results' | 'total' | 'total_pages' | ImageSearchResultKeySpecifier)[];
export type ImageSearchResultFieldPolicy = {
	hasMore?: FieldPolicy<any> | FieldReadFunction<any>,
	page?: FieldPolicy<any> | FieldReadFunction<any>,
	results?: FieldPolicy<any> | FieldReadFunction<any>,
	total?: FieldPolicy<any> | FieldReadFunction<any>,
	total_pages?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('like' | 'login' | 'register' | 'unlike' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	like?: FieldPolicy<any> | FieldReadFunction<any>,
	login?: FieldPolicy<any> | FieldReadFunction<any>,
	register?: FieldPolicy<any> | FieldReadFunction<any>,
	unlike?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('getImages' | 'me' | 'myImages' | 'ping' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	getImages?: FieldPolicy<any> | FieldReadFunction<any>,
	me?: FieldPolicy<any> | FieldReadFunction<any>,
	myImages?: FieldPolicy<any> | FieldReadFunction<any>,
	ping?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('id' | 'name' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserAuthKeySpecifier = ('token' | 'user' | UserAuthKeySpecifier)[];
export type UserAuthFieldPolicy = {
	token?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	Image?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageKeySpecifier | (() => undefined | ImageKeySpecifier),
		fields?: ImageFieldPolicy,
	},
	ImageSearchResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ImageSearchResultKeySpecifier | (() => undefined | ImageSearchResultKeySpecifier),
		fields?: ImageSearchResultFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	UserAuth?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserAuthKeySpecifier | (() => undefined | UserAuthKeySpecifier),
		fields?: UserAuthFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;