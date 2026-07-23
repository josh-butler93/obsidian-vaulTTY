# if Statement 

age = int(input("Age:"))

if age >= 18: # block of statements
    print("You can vote.")
    print("Take your ballot")
else:
    print("You must wait", 18-age, "more years.")
