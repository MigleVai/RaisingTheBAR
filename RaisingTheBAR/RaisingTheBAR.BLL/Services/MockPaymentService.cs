using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Newtonsoft.Json;
using RaisingTheBAR.BLL.Filters;
using RaisingTheBAR.BLL.Models.RequestModels;

namespace RaisingTheBAR.BLL.Services
{

    public class MockPaymentService : IPaymentService
    {
        private static readonly log4net.ILog log = log4net.LogManager.GetLogger(typeof(IPaymentService));

        public bool ExecutePayment(PaymentServiceRequest payment, PaymentServiceCredentials credentials)
        {
            log.Debug("ExecutePayment called from MockPaymentProcessor");
            return true;
        }
    }
}
