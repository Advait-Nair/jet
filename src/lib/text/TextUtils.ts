import { browser } from "$app/environment";

export function generateId(type:string, contentElement:HTMLElement, icon:string=''):string {
	if (!browser) return '';

	let content = contentElement?.textContent || contentElement?.innerText || '';
	content = content.trim().replace(icon,'')

    let id = content?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || '';
	id = `${id}`;
	// Ensure the ID is unique by looking up existing IDs in SessionStorage
	// @ts-ignore
	let existingIds: any = window['jet_internal_heading_ids'];
	let increment = 1;
    let appendedType = false;
	if (existingIds) {
		let testingId = id;
		while (existingIds.includes(testingId)) {
            // if(!appendedType) {
            //     testingId = `${id}-${type}`;
            //     appendedType = true;
            // } else {
            testingId = `${id}-${increment}`;
            increment++;
            // }
		}
		id = testingId;
	}
	// @ts-ignore
	else {window['jet_internal_heading_ids'] = [id]; return id;};
	// Store the new ID in window.jet_internal
	// @ts-ignore
	window['jet_internal_heading_ids'] = [...existingIds, id];
	return id;
}

export function procHash(hash: string): string {
	return hash.replace('#', '');
}

export function warn(id:any): void {
    if (id.length == 0 || id == '#' || !id) {
		
		console.warn(
			`A jet.text item has no defined id prop, and therefore an id has been auto-generated for it. In the likely case of text elements changing in content, so will the id, which will cause hash linking issues, severely affecting SEO and site links. Please solidly define an id prop for this element to avoid this warning.`,
		);
	}
}

export function hashTouch(id: string) {
    if (!browser) return;
    // set hash, copy to clipboard too
    location.hash = id;
    navigator.clipboard.writeText(location.href);
}

export const defaultPad:number = 60;