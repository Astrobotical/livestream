interface streamModel{
    id: number,
    title: string|null,
    description: string,
    stream_url: string,
    stream_time:string,
    stream_date: Date|string,
    stream_status:string,
    is_live: number,
    donations: string
}

export default streamModel;