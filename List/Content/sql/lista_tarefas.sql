﻿USE [master]
GO

/****** Object:  Database [lista_tarefas]    Script Date: 05/11/2018 04:10:15 ******/
CREATE DATABASE [lista_tarefas]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'lista_tarefas', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\lista_tarefas.mdf' , SIZE = 5120KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'lista_tarefas_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS\MSSQL\DATA\lista_tarefas_log.ldf' , SIZE = 1024KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO

ALTER DATABASE [lista_tarefas] SET COMPATIBILITY_LEVEL = 120
GO

IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [lista_tarefas].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO

ALTER DATABASE [lista_tarefas] SET ANSI_NULL_DEFAULT OFF 
GO

ALTER DATABASE [lista_tarefas] SET ANSI_NULLS OFF 
GO

ALTER DATABASE [lista_tarefas] SET ANSI_PADDING OFF 
GO

ALTER DATABASE [lista_tarefas] SET ANSI_WARNINGS OFF 
GO

ALTER DATABASE [lista_tarefas] SET ARITHABORT OFF 
GO

ALTER DATABASE [lista_tarefas] SET AUTO_CLOSE OFF 
GO

ALTER DATABASE [lista_tarefas] SET AUTO_SHRINK OFF 
GO

ALTER DATABASE [lista_tarefas] SET AUTO_UPDATE_STATISTICS ON 
GO

ALTER DATABASE [lista_tarefas] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO

ALTER DATABASE [lista_tarefas] SET CURSOR_DEFAULT  GLOBAL 
GO

ALTER DATABASE [lista_tarefas] SET CONCAT_NULL_YIELDS_NULL OFF 
GO

ALTER DATABASE [lista_tarefas] SET NUMERIC_ROUNDABORT OFF 
GO

ALTER DATABASE [lista_tarefas] SET QUOTED_IDENTIFIER OFF 
GO

ALTER DATABASE [lista_tarefas] SET RECURSIVE_TRIGGERS OFF 
GO

ALTER DATABASE [lista_tarefas] SET  DISABLE_BROKER 
GO

ALTER DATABASE [lista_tarefas] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO

ALTER DATABASE [lista_tarefas] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO

ALTER DATABASE [lista_tarefas] SET TRUSTWORTHY OFF 
GO

ALTER DATABASE [lista_tarefas] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO

ALTER DATABASE [lista_tarefas] SET PARAMETERIZATION SIMPLE 
GO

ALTER DATABASE [lista_tarefas] SET READ_COMMITTED_SNAPSHOT OFF 
GO

ALTER DATABASE [lista_tarefas] SET HONOR_BROKER_PRIORITY OFF 
GO

ALTER DATABASE [lista_tarefas] SET RECOVERY SIMPLE 
GO

ALTER DATABASE [lista_tarefas] SET  MULTI_USER 
GO

ALTER DATABASE [lista_tarefas] SET PAGE_VERIFY CHECKSUM  
GO

ALTER DATABASE [lista_tarefas] SET DB_CHAINING OFF 
GO

ALTER DATABASE [lista_tarefas] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO

ALTER DATABASE [lista_tarefas] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO

ALTER DATABASE [lista_tarefas] SET DELAYED_DURABILITY = DISABLED 
GO

ALTER DATABASE [lista_tarefas] SET  READ_WRITE 
GO