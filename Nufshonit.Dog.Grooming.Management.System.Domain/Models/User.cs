﻿public class User : BaseEntity
{
    public string? UserName { get; set; }
    public string? PasswordHash { get; set; }
    public string? FirstName { get; set; }
}
