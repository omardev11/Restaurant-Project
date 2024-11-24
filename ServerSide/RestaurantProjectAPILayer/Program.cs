using RestaurantDataLayer;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Register configuration as a singleton so it can be injected into classes
builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Initialize your DataAccessSetting with configuration
DataAccessSetting.Initialize(builder.Configuration);

// Register your data layer class
builder.Services.AddScoped<DataAccessSetting>();

// Add CORS configuration to allow requests from your front-end
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost",
        builder => builder.WithOrigins("http://127.0.0.1:5501")  // Front-end URL
                          .AllowAnyMethod()
                          .AllowAnyHeader());
});

// Build the application after all services are added
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Apply the CORS policy to the request pipeline
app.UseCors("AllowLocalhost");  // Apply the CORS policy here

app.UseAuthorization();
app.MapControllers();
app.Run();
