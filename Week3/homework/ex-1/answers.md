# Answers for exercise 1:

1. columns that violate 1NF:

   - member_id
   - member_address
   - dinner_date
   - food_code
   - food_description

2. entities could be extracted:
   1. member
   2. dinner
   3. venue
   4. food


3. 3NF tables:
- members_table
   
    | member_id | member_name | house_number | street_name | dinner_id |
    | --------- | ----------- | ------------ | ----------- | --------- |
    | 1         | Amit        | 321          | Max park    | D0001001  |
    | 2         | John        | 21           | 6th ave     | D0001012  |
    | 3         | Max         | 9            | Peter str   | D0001002  |


-  dinner_table
   

    | dinner_id | dinner_date | venue_id | food_id |
    | --------- | ----------- | -------- | ------- |
    | D0001001  | 2021-10-10  | V100     | C1      |
    | D0001012  | 2021-09-11  | V200     | S2      |
    | D0001002  | 2021-08-11  | V300     | F4      |
    | D0001001  | 2021-10-10  | V100     | S1      |

- Venue_table
  
  | venue_id | description     |
  | -------- | --------------- |
  | V100     | Grand Pool Room |
  | V200     | Goat Farm       |
  | V300     | Mama's kitchen  |
  | V400     | Hungry hungry   |

- food_table
  
  | food_id | description |
  | ------- | ----------- |
  | C1      | Curry       |
  | C2      | Cake        |
  | S1      | Soup        |
  | T1      | Tea         |
  | S2      | salad       |