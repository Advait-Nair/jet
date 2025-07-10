export function getClosestProperty(property:string, element:HTMLElement): any {
    let currentElement = element;
	while (currentElement && !currentElement.hasAttribute(property)) {
		currentElement = currentElement.parentElement as HTMLElement;
	}

	if (currentElement) return currentElement.getAttribute(property);
	return null;
}

export function isPossibleURL(str:string): boolean {
    return str.includes('http') || str.includes('/');
}

export function removeClass(props: Record<string, any>) {
	const { class: _, ...rest } = props;
	return rest;
}

