import pandas as pd

# Load the CSV file
df = pd.read_csv("sales_updated.csv")   # change filename if needed


# Update Store ID where storeName is Anna Nagar Store
df.loc[df["storeName"] == "Kurla Store", "Store ID"] = "MUMB-003"

# Save back to CSV
df.to_csv("sales_updated.csv", index=False)

print("Store ID updated successfully!")
