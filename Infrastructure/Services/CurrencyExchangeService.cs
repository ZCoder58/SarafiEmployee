using System;
using System.Collections.Generic;
using System.Globalization;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Application.Common.Extensions;
using Application.Common.Interfaces;
using Application.Common.Models.CurrencyExchange;
using Domain.Interfaces;
using Infrastructure.Models.CurrencyExchangeApi;
using Newtonsoft.Json;

namespace Infrastructure.Services
{
    public class CurrencyExchangeService : ICurrencyExchangeService
    {
        private readonly string _baseUrl;
        private readonly string _apiAuthorization;
        private readonly IHttpClientFactory _client;

        public CurrencyExchangeService(IHttpClientFactory client)
        {
            _client = client;
            _apiAuthorization = "17e3c3cdd9-c327353724-r6cuqz"; //api key
            _baseUrl = "https://api.fastforex.io/";
        }

        public async Task<ConvertCurrencyAndReverseResult> ConvertCurrencyAndReverseAsync(string source, string destination, double amount)
        {
            using var client = _client.CreateClient();
            client.BaseAddress = new Uri(_baseUrl);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                HttpResponseMessage response = await client.GetAsync(
                    $"convert?from={source}&to={destination}&amount={amount}&api_key={_apiAuthorization}");

                var objResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<ConvertModel>(objResponse);
                var destinationRate = await GetExchangeRateAsync(destination,source);
                return new ConvertCurrencyAndReverseResult()
                {
                    DestinationAmount = result.Result[destination].ToDoubleFormatted(),
                    DestinationName = destination,
                    DestinationRate = destinationRate.ToString(CultureInfo.InvariantCulture).ToDoubleFormatted(),
                    SourceAmount = amount.ToString(CultureInfo.InvariantCulture).ToDoubleFormatted(),
                    SourceName = source,
                    SourceRate = result.Result["rate"].ToDoubleFormatted()
                };
            }
            catch
            {
                client.CancelPendingRequests();
                throw new Exception("field to fetch data");
            }
        }
        public async Task<double> GetExchangeRateAsync(string source, string destination)
        {
            using var client = _client.CreateClient();
            client.BaseAddress = new Uri(_baseUrl);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                HttpResponseMessage response = await client.GetAsync(
                    $"fetch-one?from={source}&to={destination}&api_key={_apiAuthorization}");
                var objResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<FetchOneModel>(objResponse);
                return result.Result[destination].ToDoubleFormatted();
            }
            catch
            {
                client.CancelPendingRequests();
                throw new Exception("field to fetch data");
            }
        }
        public async Task<double> ConvertCurrencyAsync(string source, string destination,double amount)
        {
            using var client = _client.CreateClient();
            client.BaseAddress = new Uri(_baseUrl);
            client.DefaultRequestHeaders.Clear();
            client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
            try
            {
                HttpResponseMessage response = await client.GetAsync(
                    $"convert?from={source}&to={destination}&amount={amount}&api_key={_apiAuthorization}");
                var objResponse = await response.Content.ReadAsStringAsync();
                var result = JsonConvert.DeserializeObject<FetchOneModel>(objResponse);
                return result.Result[destination].ToDoubleFormatted();
            }
            catch
            { client.CancelPendingRequests();
            
                throw new Exception("field to fetch data");
            }
        }
    }
}