USE [lista_tarefas]
GO

/****** Object:  Table [dbo].[tb_tarefas]    Script Date: 05/11/2018 04:10:50 ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[tb_tarefas](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[ds_titulo] [nvarchar](max) NOT NULL,
	[fg_finalizado] [bit] NOT NULL,
	[ds_descricao] [nvarchar](max) NULL,
	[dt_criado] [date] NULL,
	[dt_editado] [date] NULL,
	[dt_deletado] [date] NULL,
	[dt_concluido] [date] NULL,
 CONSTRAINT [PK_tb_tarefas] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO