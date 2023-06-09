﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using PersonalBudgetAPI.Data;

#nullable disable

namespace PersonalBudgetAPI.Migrations
{
    [DbContext(typeof(PBudgetAppContext))]
    [Migration("20230313120606_InitialCreate")]
    partial class InitialCreate
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("PersonalBudgetAPI.Models.Budget", b =>
                {
                    b.Property<int>("BudgetId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("BudgetId"));

                    b.Property<double>("TotalAmount")
                        .HasColumnType("float");

                    b.Property<int>("UserId")
                        .HasColumnType("int");

                    b.HasKey("BudgetId");

                    b.HasIndex("UserId")
                        .IsUnique();

                    b.ToTable("Budgets");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.Transaction", b =>
                {
                    b.Property<int>("TransactionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TransactionId"));

                    b.Property<int>("BudgetId")
                        .HasColumnType("int");

                    b.Property<double>("TransactionAmount")
                        .HasColumnType("float");

                    b.Property<DateTime>("TransactionData")
                        .HasColumnType("datetime2");

                    b.Property<string>("TransactionDesc")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("TransactionId");

                    b.HasIndex("BudgetId");

                    b.ToTable("Transactions");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.User", b =>
                {
                    b.Property<int>("UserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("UserId"));

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserPassword")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.Budget", b =>
                {
                    b.HasOne("PersonalBudgetAPI.Models.User", "User")
                        .WithOne("Budget")
                        .HasForeignKey("PersonalBudgetAPI.Models.Budget", "UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.Transaction", b =>
                {
                    b.HasOne("PersonalBudgetAPI.Models.Budget", "Budget")
                        .WithMany("Transactions")
                        .HasForeignKey("BudgetId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Budget");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.Budget", b =>
                {
                    b.Navigation("Transactions");
                });

            modelBuilder.Entity("PersonalBudgetAPI.Models.User", b =>
                {
                    b.Navigation("Budget")
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
