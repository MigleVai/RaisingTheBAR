using System;
using System.IO;
using System.Net;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Services
{
    public class PaymentService
    {
        public static bool ExecutePayment(PaymentServiceRequest payment, PaymentServiceCredentials credentials)
        {
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
            catch (Exception e)
            {
                //add logging someday
                return false;
            }
        }
    }
}