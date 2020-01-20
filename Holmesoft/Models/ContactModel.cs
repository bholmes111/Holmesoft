using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Holmesoft.Models
{
    public class ContactModel
    {
        [Required(ErrorMessage = "Please enter a name")]
        
        public string Name { get; set; }
        [Required(ErrorMessage = "Please enter an email address")]
        [EmailAddress(ErrorMessage = "Please enter a valid email")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Please enter a message")]
        public string Message { get; set; }
    }
}
