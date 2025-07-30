# E-Commerce BukaWarung.com

## 1. Products (Main Entity)
1. Attributes:
    - id_(integer) PK
    - productName (varchar (not null))
    - description (varchar (not null))
    - productCode (varchar) (hooks: code generator) (optional)
    - price (integer (not null))
    - productImgUrl (varchar)
    - stock (integer)
    - UserId (integer) FK
    - CreatedAt (date)
    - UpdatedAt (date)
2. Relations
    - One product can have many categories
    - One product can only be accessed by one User
    - One product can only have one admin

3. Additional Info:
    - Only admin role can add, update and delete product
    - User can only buy product

## 2. ProductCategories (Many to Many Table)
1. Attributes:
    - id_(integer) PK
    - ProductId (integer) FK
    - CategoryId (integer) FK
    - CreatedAt (date)
    - UpdatedAt (date)

## 3. Categories
1. Attributes:
    - id_(integer) PK
    - name (varchar (not null))
    - CreatedAt (date)
    - UpdatedAt (date)
2. Relations
    - One category can have many products
    
3. Additional Info:
    - Use it as filters

## 4. User
1. Attributes:
    - id_(integer) PK
    - username (varchar (not null)) (validation required)
    - email (varchar (not null)) (validation required)
    - password (varchar (not null)) (validation required) (hooks: password hashing - Bcrypt)
    - role (varchar (not null)) (isinya user/admin)
    - createdAt (date)
    - updatedAt (date)
2. Relations
    - One user can only have one profile (one to one)
    - One user can have many products (one to many)
3. Additional Info:
    - User only has access to buy product
    - Admin has access to CRUD

## 5. UserProfiles
1. Attributes:
    - id_(integer) PK
    - name (varchar)
    - UserId (integer) FK
    - profilPhoto (varchar)
    - CreatedAt (date)
    - UpdatedAt (date)
2. Relations
    - One profile can only have one user (one to one)
3. Additional Info:
    - Works as edit page

## Additional Migration
1. change-column-FK-to-userprofiles


