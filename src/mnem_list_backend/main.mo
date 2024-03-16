import TrieMap "mo:base/TrieMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import List "mo:base/List";

actor {

  type List = {
    entry : Text;
    // listId : Nat;
  };

  var storedList = TrieMap.TrieMap<Text, List>(Text.equal, Text.hash);
  stable var storedItems : [(Text, List)] = [];

  system func preupgrade() {
    storedItems := Iter.toArray(storedList.entries());
  };

  system func postupgrade() {
    storedList := TrieMap.fromEntries(storedItems.vals(), Text.equal, Text.hash);
  };

  public shared func addEntry(args : List) : async () {
    storedList.put(args.entry, args);
  };

  public shared func updateList(args : List) : async () {
    storedList.put(args.entry, args);
  };

  public shared func delEntry(entry : Text) : async () {
    storedList.delete(entry);
  };

  public shared query func getList() : async [List] {
    Iter.toArray(storedList.vals());
  };

};
