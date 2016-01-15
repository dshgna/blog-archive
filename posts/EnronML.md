This post details my approach to the final project in Udacity's Intro to Machine Learning. This was a wonderful project which really forced me to **think** and really wish for the mentorship available in the paid option of the course. 

### The Dataset and the Problem
Enron, a multi-million enrgy superpower collapsed in the early 2000s due to one of the largest instances of corporate fraud. During the investigation, the company's email corpus was released to the public. In this project, I will be investigating the financial and email features of the data to identify employees involved in fraud (hereto referred as person of interest or poi).

### Data Exploration

Measurement | Value | Observations
--- | --- | ---
Total data points | 146 | -
Allocation across classes | POI = 18 /non-POI = 128 | Low POI representation ( around 12%) 
Number of features | 21 | 14 financial features, 7 email features

##### Handling Missing Values
 - All features have missing values
 - The features (deferral_payments, loan_advances ,restricted_stock_deferred, deferred_income, long_term_incentive,director_fees) have more than 50% of their values missing.
 - The features ['deferral_payments', 'loan_advances', 'restricted_stock_deferred', 'director_fees'] have more than 50% of poi values missing. 
 - [restricted_stock_deferred, 'director_fees', 'loan_advances'] contains no or one value for POIs. However, given that these features do not have values for a large number of non-poi data points (>110), it is nt possible to divuluge whether these missing values are a novelty for pois. 
 - __Takeaway__: Due to the large amount of overall and poi missing values, it would be imprudent to use ['deferral_payments', 'loan_advances', 'restricted_stock_deferred', 'director_fees'] as features.

##### Outlier Detection
 - I used visualization for outlier detection. While removing the top 10% values would have been more easier and 'programmatic', I felt this was not a good choice because it would remove some key POIs from the dataset. 
 - I used salary as the base and compared other financial features against it. I have not considered the features discarded due to the large amount of missing values. 
 - When analyzing the initial dataset, a data point significantly stood out (Figure 2.1), dwarfing the rest of the data. On inspection, this turned out  not to be a data point, but rather the 'TOTAL' which had been erroneously appended to the dataset.
 - The following details the rest of the outliers detected when comparing various features against each other(Figure 2.2).

Feature | Outliers | Decision
--- | --- | ---
Salary-Total Payments | 146 | The high salaries in the plot corresponds to key Enron personalities (i.e.) thus we can safely assume that they are true values rather than outliers.
Bonus | A mysterious non-POI figure with a mid-ranged salary and a bonus higher than the CEO! | Given the unexplainable discrepacy, remove this outlier.
Deferred income | Five data points below the average containing 2 non-pois and 3 pois | Keep the datapoints as a significant amount of POIs are included and removing them would be detrimental for the quality of the data.
Total stock value | A low-waged employee POI owning stocks well above the average | Could be an indication of fraud - data point left in
Expenses | Three mid-waged employees non-POI employees incurring a large amount of expenses | *"These god-fearing souls were so frustrated with the surrounding fraud that they splurged on rich stationery!"* Due to the outliers not providing a significant value, they are removed.
Exercised stock options | A low-waged employee POI owning stocks well above the average | Could be an indication of fraud - data point left in
Long term incentives | A low-waged employee POI owning stocks well above the average | Could be an indication of fraud - data point left in
Restricted stock | A low-waged employee POI owning stocks well above the average | Could be an indication of fraud - data point left in

