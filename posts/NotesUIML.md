>__Verdict:__ This is a great course that gives a high-level introduction to the machine learning process and plenty of hands-on experience with the mini-projects that use scikit-learn, Python's machine learning library.  

The following are my notes for Udacity's [Intro to Machine Learning] together with a cheatsheet of the common scikit learn functions used.  

## Step 1: Dataset and question selection
 - The first step in any machine learning problem is to identify the data source and clearly defined questions.
 - The larger the size of the dataset, the greater the quality of the result. In the majority of cases, increasing the size of the dataset yields better results than fine tuning the algorithms.
##### Train/Test dataset split
 - The dataset is divided into training and testing sets in order to;
   - Estimate the algorithm's performance on an independent dataset.
   - Identify potential over-fitting scenarios.
  - The dataset should be sampled randomly in order to bypass situations where similar training points are sequentially ordered.
  - It is important to maximize the size of both the training set (for the best learning result) and the testing set (for the best validation). The __K-Fold__ validation is used to balance this trade-off. 
##### K-Fold validation process
 1. Divide dataset into K equal bins
 2. Run K learning experiments using 1 training bin and K-1 testing bins
 3. Average the test result for the K experiments

## Step 2: Feature selection
 -  Features are the properties of a dataset (e.g. name, age, salary) that give information about the training points (e.g. employees of the company).
 - Goal: Use the minimal number of features to identify patterns and trends. A large number of features does not guarantee high information gain.
 - __Imputation:__ Missing values should be removed or normalized.
 - Special care should be paid when combining data from different data sources (e.g. verify that both sources use the same units for similar features)
 -  Features should be ignored when they:
    - Add noise
    - Cause overfitting
    - Show high correlation to existing features (no new information gain)
    - Significantly slow down training or testing 

##### Outlier Detection and Removal
 - Outliers are abnormalities in data that can be either ignored or studied.
   - data entry errors, sensor malfunctions - ignore
   - freak events - pay attention (may signal fraud etc)
 - The outlier detection process
 1. Train
 2. Remove 10% (via highest residual error[predicated-actual])
 3. Re-train and if necessary repeat process
 - Application in sk-learn: Automatic (univariate) feature selection
   - SelectPercentile: returns x percent of most powerful features
   - SelectKBest: returns k number of most powerful features

## Algorithm and parameter selection
##### Supervised Learning
 - *Learning through example:* Applied when the features are labeled.
 1. Naive Bayes Classification: 
 2. Support Vector Machines (SVM): 

##### Parameter Tuning
 -  

## Evaluation

## scikit-learn cheatsheet

Function | Module | Important Parameters
--- | --- | ---
Train/test dataset split | [`cross_validation.train_test_split`](http://scikit-learn.org/stable/modules/cross_validation.html) | test_size , random_state (a random number to enforce random sampling)
- | [`cross_validation.KFold`](http://scikit-learn.org/stable/modules/generated/sklearn.cross_validation.KFold.html#sklearn.cross_validation.KFold) | number of elements , n_folds (number of bins), shuffle (whether to shuffle data before split)

[Intro to Machine Learning]: https://www.udacity.com/courses/ud120
[scikit-learn]: http://scikit-learn.org/stable/