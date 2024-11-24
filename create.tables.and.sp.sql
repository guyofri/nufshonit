USE [DogGrooming]
GO

/****** Object: Table [dbo].[BarberQueues] Script Date: 24/11/2024 22:38:34 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[BarberQueues] (
    [Id]              BIGINT        IDENTITY (1, 1) NOT NULL,
    [CustomerName]    NVARCHAR (50) NULL,
    [ArrivalTime]     DATETIME      NULL,
    [CreatedByUserId] BIGINT        NULL,
    [CreatedDate]     DATETIME      NULL
);

USE [DogGrooming]
GO

/****** Object: Table [dbo].[Users] Script Date: 24/11/2024 22:38:57 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[Users] (
    [Id]           BIGINT         IDENTITY (1, 1) NOT NULL,
    [Username]     NVARCHAR (50)  NULL,
    [PasswordHash] NVARCHAR (255) NULL,
    [FirstName]    NVARCHAR (50)  NULL,
    [CreatedDate]  DATETIME       NULL
);



USE [DogGrooming]
GO

/****** Object: SqlProcedure [dbo].[GetAllQueues] Script Date: 24/11/2024 22:39:30 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE GetAllQueues
AS
	SELECT * from BarberQueues
