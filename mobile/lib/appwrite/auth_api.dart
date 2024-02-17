import 'package:appwrite/appwrite.dart';
import 'package:appwrite/models.dart';
import 'package:scialla/appwrite/constants.dart';
import 'package:flutter/widgets.dart';

import 'dart:convert';

enum AuthStatus {
  uninitialized,
  authenticated,
  unauthenticated,
}

class AuthAPI extends ChangeNotifier {
  Client client = Client();
  late final Account account;

  late User _currentUser;

  AuthStatus _status = AuthStatus.uninitialized;

  // Getter methods
  User get currentUser => _currentUser;
  AuthStatus get status => _status;
  String? get username => _currentUser.name;
  String? get email => _currentUser.email;
  String? get userid => _currentUser.$id;

  // Constructor
  AuthAPI() {
    init();
    loadUser();
  }

  // Initialize the Appwrite client
  init() {
    client
        .setEndpoint(APPWRITE_URL)
        .setProject(APPWRITE_PROJECT_ID)
        .setSelfSigned();
  }

  trigFun() async {
    //functions
    final functions = Functions(client);

    try {
      final execution = await functions.createExecution(
        functionId: FUN_USERCREATE,//FUN_STARTER,
        //body: json.encode({ 'foo': 'bar' }),
        //xasync: false,
        //path: '/',
        method: 'GET',
        //headers: {'X-Custom-Header': '123'}
      );
      print(execution.responseBody);
    } catch (e) {
      print(e);
    }
  }

  loadUser() async {
    try {
      final user = await account.get();
      _status = AuthStatus.authenticated;
      _currentUser = user;
    } catch (e) {
      _status = AuthStatus.unauthenticated;
    } finally {
      notifyListeners();
    }
  }

  Future<User> createUser(
      {required String email, required String password}) async {
    try {
      final user = await account.create(
          userId: ID.unique(), email: email, password: password, name: 'Jimmy');

      return user;
    } finally {
      notifyListeners();
    }
  }

  /*createDocument() async {
    try {
      final response = await databases.createDocument(
          databaseId: APPWRITE_DATABASE_ID,
          collectionId: COLLECTION_USERINFO,
          documentId: userID,
          data: {
            'name': name,
            'surname': 'Pesce',
            'country': 'Italy',
            //'birthday': DateTime.now(),
          });
      if (response.data.isNotEmpty) {
        print('andata bello');
        //await listDocument();
        //Navigator.pop(context);
      }
    } catch (e) {
      print(e);
      rethrow;
    }
  }*/

  Future<Session> createEmailSession(
      {required String email, required String password}) async {
    try {
      final session =
          await account.createEmailSession(email: email, password: password);
      _currentUser = await account.get();
      _status = AuthStatus.authenticated;
      return session;
    } finally {
      notifyListeners();
    }
  }

  signInWithProvider({required String provider}) async {
    try {
      final session = await account.createOAuth2Session(provider: provider);
      _currentUser = await account.get();
      _status = AuthStatus.authenticated;
      return session;
    } finally {
      notifyListeners();
    }
  }

  signOut() async {
    try {
      await account.deleteSession(sessionId: 'current');
      _status = AuthStatus.unauthenticated;
    } finally {
      notifyListeners();
    }
  }

  Future<Preferences> getUserPreferences() async {
    return await account.getPrefs();
  }

  updatePreferences({required String bio}) async {
    return account.updatePrefs(prefs: {'bio': bio});
  }
}
