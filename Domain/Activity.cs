namespace Domain // namespace of the folder where the class is located
{
    public class Activity // creates an entity class to represent the data in the database
    {
        public Guid Id { get; set; } // Guid is a globally unique identifier
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }

    }
}