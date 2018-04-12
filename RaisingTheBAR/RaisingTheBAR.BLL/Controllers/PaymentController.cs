using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using RaisingTheBAR.BLL.Models.RequestModels;
using RaisingTheBAR.Core.Models;

namespace RaisingTheBAR.BLL.Controllers
{
    [Produces("application/json")]
    [Route("api/Payment")]
    public class PaymentController : Controller
    {
        // TODO iškerkti į config
        public IConfiguration Configuration { get; }
        DbContext _dbContext;
        string user;
        string password;
        string encoded;
        HttpWebRequest mockProcessorRequest;


        public PaymentController(IConfiguration configuration, DbContext dbContext)
        {
            Configuration = configuration;
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
            var userContext = _dbContext.Set<User>();

            var payment = new PaymentRequest
            {
                cvv = request.cvv,
                exp_month = request.exp_month,
                exp_year = request.exp_year,
                holder = request.holder,
                number = request.number
            };

            var json = JsonConvert.SerializeObject(payment);


            // Send the request.
            using (var streamWriter = new StreamWriter(mockProcessorRequest.GetRequestStream()))
            {
                streamWriter.Write(json);
                streamWriter.Flush();
                streamWriter.Close();
            }

            try {
                // Get the response.
                var httpResponse = (HttpWebResponse)mockProcessorRequest.GetResponse();
                using (var streamReader = new StreamReader(httpResponse.GetResponseStream())) {
                    var result = streamReader.ReadToEnd();

                }
            } catch (WebException e) {
                return BadRequest(e);
            }



            return Ok();
        }


    }
}
