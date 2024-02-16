import 'package:appwrite/appwrite.dart';
import 'package:scialla/appwrite/constants.dart';
import 'package:flutter/widgets.dart';

void initfunction(){
  WidgetsFlutterBinding.ensureInitialized();
  Client client = Client()
        .setEndpoint(APPWRITE_URL)
        .setProject(APPWRITE_PROJECT_ID)
        .setSelfSigned();
}