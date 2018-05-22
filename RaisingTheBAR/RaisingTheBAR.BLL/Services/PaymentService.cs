using Newtonsoft.Json;
using RaisingTheBAR.BLL.Models.RequestModels;
using System;
using System.IO;
using System.Net;

namespace RaisingTheBAR.BLL.Services
{
    public class PaymentService: IPaymentService
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(IPaymentService));

        public bool ExecutePayment(PaymentServiceRequest payment, PaymentServiceCredentials credentials)
        {
            log.Debug("ExecutePayment called from PaymentService");

            var encoded = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(credentials.UserName + ":" + credentials.Password));

            var mockProcessorRequest = (HttpWebRequest)WebRequest.Create("https://mock-payment-processor.appspot.com/v1/payment");
            mockProcessorRequest.Headers.Add("Authorization", "Basic " + encoded);
            mockProcessorRequest.ContentType = "application/json";
            mockProcessorRequest.Method = "POST";

            var json = JsonConvert.SerializeObject(payment);
            
            using (var streamWriter = new StreamWriter(mockProcessorRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            try
            {
                var httpResponse = (HttpWebResponse)mockProcessorRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream() ?? throw new InvalidOperationException()))
                {
                    var result = streamReader.ReadToEnd();
                    return !string.IsNullOrEmpty(result);
                }
            }
            catch (InvalidOperationException)
            {
                //add logging someday
                return false;
            }
        }
    }
}