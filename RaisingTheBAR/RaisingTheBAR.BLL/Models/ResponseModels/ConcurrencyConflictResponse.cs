namespace RaisingTheBAR.BLL.Models.ResponseModels
{
    public class ConcurrencyConflictResponse
    {
        public string Property { get; set; }
        public string ProposedValue { get; set; }
        public string ActualValue { get; set; }
    }
}