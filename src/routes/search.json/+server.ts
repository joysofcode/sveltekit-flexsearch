import { json } from '@sveltejs/kit'
import posts from './posts.json'

export async function GET() {
	return json(posts)
}
