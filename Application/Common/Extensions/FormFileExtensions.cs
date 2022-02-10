using System;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using LazZiya.ImageResize;
using Microsoft.AspNetCore.Http;

namespace Application.Common.Extensions
{
    public static class FormFileExtensions
    {
        // /// <summary>
        // /// save and crop image
        // /// </summary>
        // ///<param name="file"></param>
        // /// <param name="size">an int for width and height</param>
        // /// <param name="path">full file path</param>
        // /// <param name="folderName">folder name to save eg: lg,md,ms,xs</param>
        // /// <returns>saved unique file name</returns>
        // public static async Task<string> ResizeImageAndSaveAsync(this IFormFile file,int size,string path)
        // {
        //     var uniqFileName = file.GenerateUniqueFileName(path);
        //     var savePath = Path.Combine(path,uniqFileName);
        //     using var img = Image.FromStream(file.OpenReadStream());
        //     img.ScaleAndCrop(size,size).SaveAs(savePath);
        //     return await Task.FromResult(uniqFileName);
        // }
        
        /// <summary>
        /// check if file is a photo file or not
        /// </summary>
        /// <param name="file"></param>
        /// <returns>true if file is photo else false</returns>
        public static bool IsPhoto(this IFormFile file)
        {
            var fileType = file.ContentType;
            return fileType.Contains("image");
        }
        /// <summary>
        /// save file to directory
        /// </summary>
        /// <param name="file"></param>
        /// <param name="path"></param>
        /// <returns>saved file name</returns>
        public static async Task<string> SaveToAsync(this IFormFile file,string path)
        {
            var filePath = Path.Combine(path);
            if (!Directory.Exists(filePath))
            {
                Directory.CreateDirectory(filePath);
            }

            var fileName = file.GenerateUniqueFileName(path);
            var fileSavePath = Path.Combine(filePath, fileName);
            await using var fileStream = new FileStream(fileSavePath, FileMode.Create);
            await file.CopyToAsync(fileStream);
            fileStream.Close();
           return await Task.FromResult(fileName);
        }
        // public static FileContentResult DownloadFile(string filePath,bool isInWwwrootFolder)
        // {
        //     filePath =(isInWwwrootFolder ? Path.Combine("wwwroot", filePath.Remove(0,1)) : filePath);
        //     byte[] fileBytes = File.ReadAllBytes(filePath);
        //     return new FileContentResult(fileBytes, MimeType.GetMimeType(filePath));
        // }
        // public static void DeleteFile(string filePath,bool isInWwwrootFolder)
        // {
        //     filePath = (isInWwwrootFolder ? Path.Combine("wwwroot", filePath.Remove(0, 1)) : filePath);
        //
        //     if (File.Exists(filePath))
        //     {
        //         File.Delete(filePath);
        //     }
        // }
        private static string GenerateUniqueFileName(this IFormFile file,string path)
        {
            var fullFilePath = path + "/" + file.FileName;
            var uniqueFileName = file.FileName;
            var counter = 1;
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            while (File.Exists(fullFilePath))
            {
                uniqueFileName = Path.GetFileNameWithoutExtension(file.FileName) + "(" + counter + ")" +
                                 Path.GetExtension(file.FileName);
                fullFilePath = Path.Combine(path,uniqueFileName);
                counter++;
            }
            return uniqueFileName;
        }
    }
}