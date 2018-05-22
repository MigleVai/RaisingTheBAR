using RaisingTheBAR.BLL.Models.RequestModels;

namespace RaisingTheBAR.BLL.Services
{
    public interface IPaymentService
    {
        bool ExecutePayment(PaymentServiceRequest payment, PaymentServiceCredentials credentials);
    }
}