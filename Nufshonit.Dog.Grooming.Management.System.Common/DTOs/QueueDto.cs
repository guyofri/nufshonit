public class BarberQueueDto
{
    public long? Id { get; set; }
    public string? CustomerName { get; set; }
    public DateTime? ArrivalTime { get; set; }
    public long? CreatedByUserId { get; set; }
    public DateTime? CreatedDate { get; set; }
    public DateTime? FromCreatedDate { get; set; }
    public DateTime? ToCreatedDate { get; set; }
}