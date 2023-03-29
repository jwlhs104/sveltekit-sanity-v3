import { store } from '$lib/config/firebase/firebase.config';
import { collection, query, getDocs } from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { error } from '@sveltejs/kit';

// export const prerender = 'auto';
export const load = async ({ parent, params, setHeaders }) => {
	const q = query(collection(store, "posts"));

	const querySnapshot = await getDocs(q);
	const posts:DocumentData[] = [];
	querySnapshot.forEach((doc) => {
		posts.push(doc.data());
	});

	if (!posts) {
		throw error(500, 'Posts not found');
	}

	setHeaders({
		"cache-control": "max-age=60"
	})

	return {
		posts
	};
};
