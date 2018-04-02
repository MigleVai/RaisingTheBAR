using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Payment")]
    public class PaymentController : Controller
    {
        DbContext _dbContext;
        string user;
        string password;
        string encoded;
        HttpWebRequest mockProcessorRequest;


        public PaymentController(DbContext dbContext)
        {
            _dbContext = dbContext;

            // Preparing the connection.
            user = "technologines";
            password = "platformos";
            encoded = Convert.ToBase64String(System.Text.Encoding.UTF8.GetBytes(user + ":" + password));
            mockProcessorRequest = (HttpWebRequest)WebRequest.Create("https://mock-payment-processor.appspot.com/v1/payment");
            mockProcessorRequest.Headers.Add("Authorization", "Basic " + encoded);
            mockProcessorRequest.ContentType = "application/json";
            mockProcessorRequest.Method = "POST";
        }

        [HttpPost("[Action]")]
        public IActionResult ExecutePayment([FromBody] PaymentRequest request)
        {
            var payment = new PaymentRequest
            {
                amount = 100,
                cvv = "123",
                exp_month = 9,
                exp_year = 2018,
                holder = "Vardenis Pavardenis",
                number = "4111111111111111"
            };

            var json = JsonConvert.SerializeObject(payment);


            // Send the request.
            using (var streamWriter = new StreamWriter(mockProcessorRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }


            // Get the response.
            var httpResponse = (HttpWebResponse)mockProcessorRequest.GetResponse();
            using (var streamReader = new StreamReader(httpResponse.GetResponseStream()))
            {
                var result = streamReader.ReadToEnd();

                // Print the fucker.
                Console.WriteLine(httpResponse.Headers + Environment.NewLine);
                Console.WriteLine(result);
            }


            return Ok();
        }


    }
}
