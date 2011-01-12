
  //
  // Current OpenAjax Alliance Rule Set (0.9 Beta)
  //
  
OpenAjax.a11y.addRuleset(
    {
        //
        // OpenAjax Alliance WCAG 2.0 Ruleset
        //
    	id : 'WCAG_2_0',
        nameCode : 'WCAG20.name',
        descriptionCode : 'WCAG20.description',
        versionCode : 'WCAG20.version',
                
        // rulesetUrl - URL of the checklist/ruleset as a whole
        rulesetUrl : 'http://www.w3.org/TR/WCAG20/',
        // baseReqUrl - used to resolve relative urls of requirementUrls only
        baseReqUrl : 'http://www.w3.org/TR/WCAG20/',
        
        requirements : [   
         {
                 criterionNumber : '1.1.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_1_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#text-equiv',
                 rules : {
                   'rule_1' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_1',
                              },
                   'rule_2' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_2',
                              },
                   'rule_3' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_3',
                              },
                   'rule_4' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_4',
                              },
                   'rule_5' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_5',
                              },
                   'rule_6' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_6',
                              },
                 }
               },  // end 1.1.1
               {
                 criterionNumber : '1.2.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_2_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-av-only-alt',
                 rules : {
                 }
               },  // end 1.2.1
               {
                 criterionNumber : '1.2.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_2_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-captions',
                 rules : {
                 }
               },  // end 1.2.2
               {
                 criterionNumber : '1.2.3',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_2_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc',
                 rules : {
                 }
               },  // end 1.2.3
               {
                 criterionNumber : '1.2.4',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.1_2_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-real-time-captions',
                 rules : {
                 }
               },  // end 1.2.4
               {
                 criterionNumber : '1.2.5',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.1_2_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-audio-desc-only',
                 rules : {
                 }
               },  // end 1.2.5
               {
                 criterionNumber : '1.2.6',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_2_6',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-sign',
                 rules : {
                 }
               },  // end 1.2.6
               {
                 criterionNumber : '1.2.7',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_2_7',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-extended-ad',
                 rules : {
                 }
               },  // end 1.2.7
               {
                 criterionNumber : '1.2.8',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_2_8',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-text-doc',
                 rules : {
                 }
               },  // end 1.2.8
               {
                 criterionNumber : '1.2.9',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_2_9',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#media-equiv-live-audio-only',
                 rules : {
                 }
               },  // end 1.2.9
               {
                 criterionNumber : '1.3.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_3_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-programmatic',
                 rules : {
                   'rule_7' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_7',
                              },
                   'rule_8' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_8',
                              },
                   'rule_9' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_9',
                              },
                   'rule_10' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_10',
                              },
                   'rule_11' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_11',
                              },
                   'rule_12' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_12',
                              },
                   'rule_13' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_13',
                              },
                   'rule_14' : {
                                severityCode: 'level.potentialViolation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_14',
                              },
                 }
               },  // end 1.3.1
               {
                 criterionNumber : '1.3.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_3_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-sequenc',
                 rules : {
                 }
               },  // end 1.3.2
               {
                 criterionNumber : '1.3.3',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_3_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#content-structure-separation-understanding',
                 rules : {
                 }
               },  // end 1.3.3
               {
                 criterionNumber : '1.4.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_4_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-without-color',
                 rules : {
                 }
               },  // end 1.4.1
               {
                 criterionNumber : '1.4.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.1_4_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-dis-audio',
                 rules : {
                 }
               },  // end 1.4.2
               {
                 criterionNumber : '1.4.3',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.1_4_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-contrast',
                 rules : {
                   'rule_15' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_15',
                              },
                   'rule_16' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_16',
                              },
                   'rule_17' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_17',
                              },
                 }
               },  // end 1.4.3
               {
                 criterionNumber : '1.4.4',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.1_4_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-scale',
                 rules : {
                 }
               },  // end 1.4.4
               {
                 criterionNumber : '1.4.5',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.1_4_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-presentation',
                 rules : {
                 }
               },  // end 1.4.5
               {
                 criterionNumber : '1.4.6',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_4_6',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast7',
                 rules : {
                 }
               },  // end 1.4.6
               {
                 criterionNumber : '1.4.7',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_4_7',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#isual-audio-contrast-noaudio',
                 rules : {
                 }
               },  // end 1.4.7
               {
                 criterionNumber : '1.4.8',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_4_8',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-visual-presentation',
                 rules : {
                 }
               },  // end 1.4.8
               {
                 criterionNumber : '1.4.9',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.1_4_9',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#visual-audio-contrast-text-images',
                 rules : {
                 }
               },  // end 1.4.9
               {
                 criterionNumber : '2.1.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_1_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-keyboard-operable',
                 rules : {
                   'rule_18' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_18',
                              },
                   'rule_19' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_19',
                              },
                   'rule_20' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_20',
                              },
                   'rule_21' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_21',
                              },
                   'rule_22' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_22',
                              },
                   'rule_73' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_73',
                              },
                   'rule_74' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_74',
                              },
                   'rule_75' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_75',
                              },
                   'rule_76' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_76',
                              },
                   'rule_77' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_77',
                              },
                 }
               },  // end 2.1.1
               {
                 criterionNumber : '2.1.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_1_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-trapping',
                 rules : {
                 }
               },  // end 2.1.2
               {
                 criterionNumber : '2.1.3',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.2_1_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-keyboard-operation-all-funcs',
                 rules : {
                   'rule_23' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_23',
                              },
                   'rule_24' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_24',
                              },
                 }
               },  // end 2.1.3
               {
                 criterionNumber : '2.2.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_2_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-required-behaviors',
                 rules : {
                 }
               },  // end 2.2.1
               {
                 criterionNumber : '2.2.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_2_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-pause',
                 rules : {
                   'rule_25' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_25',
                              },
                 }
               },  // end 2.2.2
               {
                 criterionNumber : '2.2.3',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.2_2_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-no-exceptions',
                 rules : {
                 }
               },  // end 2.2.3
               {
                 criterionNumber : '2.2.4',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.2_2_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-postponed',
                 rules : {
                 }
               },  // end 2.2.4
               {
                 criterionNumber : '2.2.5',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.2_2_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-time-limits-server-timeout',
                 rules : {
                 }
               },  // end 2.2.5
               {
                 criterionNumber : '2.3.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_3_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-seizure-does-not-violate',
                 rules : {
                 }
               },  // end 2.3.1
               {
                 criterionNumber : '2.3.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_3_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-seizure-three-times',
                 rules : {
                 }
               },  // end 2.3.2
               {
                 criterionNumber : '2.4.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-skip',
                 rules : {
                   'rule_26' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_26',
                              },
                   'rule_27' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_27',
                              },
                   'rule_28' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_28',
                              },
                 }
               },  // end 2.4.1
               {
                 criterionNumber : '2.4.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-title',
                 rules : {
                   'rule_29' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_29',
                              },
                   'rule_30' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_30',
                              },
                   'rule_31' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_31',
                              },
                   'rule_32' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_32',
                              },
                   'rule_33' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_33',
                              },
                   'rule_61' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_61',
                              },
                   'rule_62' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_62',
                              },
                 }
               },  // end 2.4.2
               {
                 criterionNumber : '2.4.3',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-focus-order',
                 rules : {
                 }
               },  // end 2.4.3
               {
                 criterionNumber : '2.4.4',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-refs',
                 rules : {
                   'rule_34' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_34',
                              },
                   'rule_35' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_35',
                              },
                   'rule_36' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_36',
                              },
                   'rule_37' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_37',
                              },
                   'rule_38' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_38',
                              },
                 }
               },  // end 2.4.4
               {
                 criterionNumber : '2.4.5',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.2_4_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-mult-loc',
                 rules : {
                 }
               },  // end 2.4.5
               {
                 criterionNumber : '2.4.6',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.2_4_6',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-descriptive',
                 rules : {
                   'rule_39' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_39',
                              },
                   'rule_40' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_40',
                              },
                   'rule_41' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_41',
                              },
                   'rule_42' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_42',
                              },
                   'rule_43' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_43',
                              },
                   'rule_44' : {
                                severityCode: 'level.potentialViolation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_44',
                              },
                 }
               },  // end 2.4.6
               {
                 criterionNumber : '2.4.7',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.2_4_7',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#navigation-mechanisms-focus-visible',
                 rules : {
                 }
               },  // end 2.4.7
               {
                 criterionNumber : '2.4.8',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_8',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-location',
                 rules : {
                 }
               },  // end 2.4.8
               {
                 criterionNumber : '2.4.9',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_9',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-link',
                 rules : {
                 }
               },  // end 2.4.9
               {
                 criterionNumber : '2.4.10',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.2_4_10',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-navigation-mechanisms-headings',
                 rules : {
                 }
               },  // end 2.4.10
               {
                 criterionNumber : '3.1.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.3_1_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-doc-lang-id',
                 rules : {
                   'rule_45' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_45',
                              },
                   'rule_46' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_46',
                              },
                 }
               },  // end 3.1.1
               {
                 criterionNumber : '3.1.2',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.3_1_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-other-lang-id',
                 rules : {
                 }
               },  // end 3.1.2
               {
                 criterionNumber : '3.1.3',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_1_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-idioms',
                 rules : {
                 }
               },  // end 3.1.3
               {
                 criterionNumber : '3.1.4',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_1_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-located',
                 rules : {
                 }
               },  // end 3.1.4
               {
                 criterionNumber : '3.1.5',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_1_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-supplements',
                 rules : {
                 }
               },  // end 3.1.5
               {
                 criterionNumber : '3.1.6',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_1_6',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-meaning-pronunciation',
                 rules : {
                 }
               },  // end 3.1.6
               {
                 criterionNumber : '3.2.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.3_2_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-receive-focus',
                 rules : {
                 }
               },  // end 3.2.1
               {
                 criterionNumber : '3.2.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.3_2_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-unpredictable-change',
                 rules : {
                 }
               },  // end 3.2.2
               {
                 criterionNumber : '3.2.3',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.3_2_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-locations',
                 rules : {
                 }
               },  // end 3.2.3
               {
                 criterionNumber : '3.2.4',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.3_2_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-consistent-functionality',
                 rules : {
                 }
               },  // end 3.2.4
               {
                 criterionNumber : '3.2.5',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_2_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-consistent-behavior-no-extreme-changes-context',
                 rules : {
                 }
               },  // end 3.2.5
               {
                 criterionNumber : '3.3.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.3_3_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-identified',
                 rules : {
                 }
               },  // end 3.3.1
               {
                 criterionNumber : '3.3.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.3_3_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-cues',
                 rules : {
                   'rule_47' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_47',
                              },
                   'rule_48' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_48',
                              },
                   'rule_49' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_49',
                              },
                   'rule_50' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_50',
                              },
                   'rule_51' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_51',
                              },
                   'rule_52' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_52',
                              },
                   'rule_53' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_53',
                              },
                   'rule_54' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_54',
                              },
                   'rule_55' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_55',
                              },
                   'rule_56' : {
                                severityCode: 'level.recommendation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_56',
                              },
                   'rule_57' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_57',
                              },
                 }
               },  // end 3.3.2
               {
                 criterionNumber : '3.3.3',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.3_3_3',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-suggestions',
                 rules : {
                 }
               },  // end 3.3.3
               {
                 criterionNumber : '3.3.4',
                 criterionLevel : 'WCAG20.level.AA',
                 criterionDesc : 'WCAG20.description.3_3_4',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible',
                 rules : {
                 }
               },  // end 3.3.4
               {
                 criterionNumber : '3.3.5',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_3_5',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-context-help',
                 rules : {
                 }
               },  // end 3.3.5
               {
                 criterionNumber : '3.3.6',
                 criterionLevel : 'WCAG20.level.AAA',
                 criterionDesc : 'WCAG20.description.3_3_6',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-minimize-error-reversible-all',
                 rules : {
                 }
               },  // end 3.3.6
               {
                 criterionNumber : '4.1.1',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.4_1_1',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-parses',
                 rules : {
                   'rule_58' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_58',
                              },
                   'rule_59' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_59',
                              },
                   'rule_60' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p2',
                                messageCode: 'message_60',
                              },
                   'rule_64' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_64',
                              },
                   'rule_65' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_65',
                              },
                   'rule_66' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_66',
                              },
                 }
               },  // end 4.1.1
               {
                 criterionNumber : '4.1.2',
                 criterionLevel : 'WCAG20.level.A',
                 criterionDesc : 'WCAG20.description.4_1_2',
                 requirementUrl: 'http://www.w3.org/TR/WCAG20/#qr-ensure-compat-rsv',
                 rules : {
                   'rule_63' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_63',
                              },
                   'rule_67' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_67',
                              },
                   'rule_68' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_68',
                              },
                   'rule_69' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_69',
                              },
                   'rule_70' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_70',
                              },
                   'rule_71' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_71',
                              },
                   'rule_72' : {
                                severityCode: 'level.violation',
                                priorityCode: 'priority.p1',
                                messageCode: 'message_72',
                              },
                 }
               },  // end 4.1.2
         
      ]
    }
);

        

