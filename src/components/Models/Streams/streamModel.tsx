interface streamModel{
    id: number,
    title: string|null,
    description: string,
    stream_url: string,
    stream_time:string,
    stream_date: Date|string,
}

export default streamModel;