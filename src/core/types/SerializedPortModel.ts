export type SerializedPortModel = 					{
	id: string,
	type: string,
	x: number,
	y: number,
	name: string,
	alignment: string,
	parentNode: string,
	links: string[],
	in: boolean,
	label: string,
	features: any[]
}