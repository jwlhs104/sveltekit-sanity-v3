import { collection, query, where, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { store } from "$lib/config/firebase/firebase.config"
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ parent, params, setHeaders }) => {
	const q = query(collection(store, "posts"), where("slug", "==", params.slug));

	const querySnapshot = await getDocs(q);
	const posts:DocumentData[] = [];
	querySnapshot.forEach((doc) => {
		posts.push(doc.data());
	});
	const post = posts[0];

	if (!post) {
		throw error(404, 'Post not found');
	}

	setHeaders({
		"cache-control": "max-age=60"
	})

	return {
		slug: post?.slug || params.slug,
		postData: post,
	};
};
