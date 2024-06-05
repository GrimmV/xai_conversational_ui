

  // $: if (messages.length === 4) {
  //   sendSystemMessage("\u2607 Chosen step: Understanding Data");
  // }
  // $: if (messages.length === 5) {
  //   sendSystemMessage(
  //     "Most features are rather uncorrelated. A relatively strong correlation occurs between residual sugar and density (+0.81)" +
  //       " while a relatively strong negative correlation occurs between alcohol and density (-0.84)." +
  //       " Do you want to see the detailed confusion matrix?"
  //   );
  // }
  // $: if (messages.length === 7) {
  //   // sendSystemMessage("Here is the detailed correlation matrix:", [
  //   //   {
  //   //     component: "corrMatrix",
  //   //     title: "Feature Correlation",
  //   //     dataParams: {},
  //   //   },
  //   // ]);
  //   sendSystemMessage(
  //     "Here is the learning curve for the training set:",
  //     [
  //       {
  //         component: "statistics",
  //         title: "Scatterplot",
  //         dataParams: {
  //           feature: "alcohol",
  //           activeClass: "4",
  //         },
  //       },
  //       {
  //         component: "featureContext",
  //         title: "Feature Context!",
  //         dataParams: {
  //           feature: "alcohol",
  //           activeClass: "4",
  //           showDistribution: true,
  //           showShapValue: true,
  //           showPartialDependence: true,
  //         },
  //       },
  //       {
  //         component: "featureContext",
  //         title: "Feature Context!",
  //         dataParams: {
  //           feature: "volatile acidity",
  //           activeClass: "4",
  //           showDistribution: true,
  //           showShapValue: true,
  //           showPartialDependence: true,
  //         },
  //       }
  //     ],
  //     "flex mx-2 flex-wrap"
  //   );
  // }

  // $: if (messages.length === 9) {
  //   sendSystemMessage("\u2607 Chosen step: Understanding Model");
  // }
  // $: if (messages.length === 10) {
  //   sendSystemMessage(
  //     "Ok, no problem. Here are the confusion matrices between actual classes and the predictions by the model:",
  //     [
  //       {
  //         component: "predConfMatrix",
  //         title: "Train Confusion Matrix",
  //         dataParams: { type: "train" },
  //       },
  //       {
  //         component: "predConfMatrix",
  //         title: "Test Confusion Matrix",
  //         dataParams: { type: "test" },
  //       },
  //     ],
  //     "flex mx-2"
  //   );
  // }